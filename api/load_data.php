<?php

	function get_ip_space() {
		$query = mysql_query("SELECT distinct ip_address from reverse_lkp");
		$out = array();

        while($row = mysql_fetch_array($query)) {
            $out[] = $row[0];
        }
        
        return $out;
	}

	$conn = mysql_connect('127.0.0.1', 'root', 'fbhack2013$$') or die('MySQL connection failed!');
	mysql_select_db('fbhack');

	$ipSpace = get_ip_space();
	$facebookIpSpace = array('31.13.78.71', '69.171.248.16', '31.13.65.7', '31.13.78.71');
	$srcSpace = array('192.168.2.1', '192.168.2.2', '192.168.2.3', '192.168.2.4', '192.168.2.5', '192.168.2.6', '192.168.2.7');

	while (true) {
		//mysql_query('INSERT INTO packet (src, dest, size) VALUES (\'' . '192.168.2.5' . '\', \'' . $facebookIpSpace[array_rand($facebookIpSpace)] . '\', ' . rand(0, 64260) . ')');
		mysql_query('INSERT INTO packet (src, dest, size) VALUES (\'' . $srcSpace[array_rand($srcSpace)] . '\', \'' . $ipSpace[array_rand($ipSpace)] . '\', ' . rand(0, 64260) . ')');
		mysql_query('INSERT INTO packet (src, dest, size) VALUES (\'' . $srcSpace[array_rand($srcSpace)] . '\', \'' . $ipSpace[array_rand($ipSpace)] . '\', ' . rand(0, 64260) . ')');
		usleep(500000);
	}

	mysql_close($conn);

?>