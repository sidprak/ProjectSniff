<?php

    class FBHack_MySQL {
        private $host = "localhost";
        private $user = "root";
        private $passwd = "fbhack2013$$";
        private $db = "fbhack";

        function __construct() {
            $this->con = mysql_connect($this->host, $this->user, $this->passwd);
            if ( ! $this->con) {
                die('Could not connect to MySQL server: ' . mysql_error());
            }

            mysql_select_db($this->db, $this->con);
        }

        function query($query) {
            return mysql_query($query);
        }

        function close() {
            mysql_close($this->con);
        }
    }

?>
