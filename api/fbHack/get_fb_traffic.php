<?php

    require_once('util/db.php');
    header('Access-Control-Allow-Origin: *');
    $mysql_obj = new FBHack_MySQL();

    $result = $mysql_obj->query("SELECT ni.name AS 'src', f.num as 'fbHits', n.num as 'nonFbHits', f.num / (n.num + f.num) AS 'percentOverall' FROM (SELECT p.src, count(1) AS num FROM packet p, reverse_lkp r WHERE p.dest = r.ip_address AND r.domain = 'facebook.com' AND p.src LIKE '192.168.%' GROUP BY p.src) f, (SELECT p.src, count(1) AS num FROM packet p, reverse_lkp r WHERE p.dest = r.ip_address AND r.domain != 'facebook.com' AND p.src LIKE '192.168.%' GROUP BY p.src) n, name_ip ni WHERE f.src = n.src AND f.src = ni.ip_address ORDER BY fbHits DESC;"); 

    $out = array();

    while($row = mysql_fetch_array($result)) {
        $out[] = array('src' => $row['src'], 'facebookHits' => $row['fbHits'], 'nonFacebookHits' => $row['nonFbHits'], 'percentOverall' => $row['percentOverall']);
    }
    
    print json_encode($out);

?>
