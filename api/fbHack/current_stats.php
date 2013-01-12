<?php

    function get_number_of_users($mysql_obj) {
        return mysql_result($mysql_obj->query("SELECT COUNT(DISTINCT(src)) FROM packet WHERE create_date > NOW() - INTERVAL 5 SECOND AND src LIKE '192.168.%' AND dest NOT LIKE '192.168.%' AND dest != '255.255.255.255'"), 0);
    }

    function geoip_cache_miss($mysql_obj, $ip_addr) {
        $cmd = "/opt/local/bin/python /Applications/MAMP/htdocs/get_lat_long.py $ip_addr";
        exec($cmd, $dat);

        if (! $dat) {
            $lat = 999;
            $long = 999;
        } else {
        	$lat = $dat[0];
        	$long = $dat[1];
        }

    	$mysql_obj->query("INSERT INTO geoip (ip_address, latitude, longitude) VALUES ('$ip_addr', $lat, $long)");
    	return array($lat, $long);
    }

    function get_lat_long($mysql_obj, $dest) {
    	$ip_addr = mysql_real_escape_string($dest);
    	$query = $mysql_obj->query("SELECT latitude, longitude FROM geoip WHERE ip_address = '$ip_addr'");

    	while ($row = mysql_fetch_array($query)) {
            return array($row[0], $row[1]);
        }

        return geoip_cache_miss($mysql_obj, $dest);
    }

    function get_geo_ip_info($mysql_obj) {
        $result = $mysql_obj->query("SELECT dest, COUNT(packet_id) AS num FROM packet WHERE src LIKE '192.168.%' AND dest NOT LIKE '192.168.%' AND dest != '255.255.255.255' AND create_date > NOW() - INTERVAL 5 SECOND GROUP BY dest");
        $out = array();

        while($row = mysql_fetch_array($result)) {
        	list($lat, $long) = get_lat_long($mysql_obj, $row['dest']);
            $out[] = array('numPackets' => $row['num'], 'destination' => $row['dest'], 'latitude' => $lat, 'longitude' => $long);
        }
        
        return $out;
    }

	##########
    # MAIN
    ##########

    require_once('./util/db.php');
    header('Access-Control-Allow-Origin: *');

    $mysql_obj = new FBHack_MySQL();
    $result = array();

    $json_out['numUsers'] = get_number_of_users($mysql_obj);
    $json_out['geoip'] = get_geo_ip_info($mysql_obj);

    $mysql_obj->close();

    ##########
    # OUTPUT
    ##########

  	print json_encode($json_out);
?>
