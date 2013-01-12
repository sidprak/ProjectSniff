<?php
    require_once('./util/db.php');
    date_default_timezone_set('America/New_York');
    header('Access-Control-Allow-Origin: *');

    $from_time_unprocessed = mysql_real_escape_string($_GET['timestamp']);

    $from_time = date('Y-m-d H:i:s', $from_time_unprocessed);
    
    $mysql_obj = new FBHack_MySQL();
    $top_domains_sql_obj = $mysql_obj->query("SELECT p.dest, r.domain, SUM(p.size), count(p.packet_id) AS num FROM packet p, reverse_lkp r WHERE p.dest = r.ip_address AND p.create_date > '$from_time' AND r.domain NOT IN ('Private', 'Multicast', 'Link-Local') GROUP BY domain ORDER BY num DESC LIMIT 10;");

    $top_domains = [];

    while ($domain = mysql_fetch_array($top_domains_sql_obj)) {
        $domain_name = $domain['domain']; 
        array_push($top_domains, array('destination' => $domain_name, 'size' => $domain[2], 'packet_count' => $domain[3]));
    }

    $mysql_obj->close();
    echo json_encode($top_domains);
?>
