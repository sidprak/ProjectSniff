#include <iostream>
#include <stdio.h>
#include <winsock.h>
#include <mysql.h>

using namespace std;

int main()
{
    MYSQL *conn;
    MYSQL_RES *res;
    MYSQL_ROW row;
    char *server="192.168.2.1";
    char *user = "root";
    char *password = "fbhack2013$$";
    char *database = "fbhack";

    const char *sPS2 = "INSERT INTO packet (src, dest, size) VALUES (?,?,?)";
    conn = mysql_init(NULL);

    if (!mysql_real_connect(conn, server, user, password, database, 0, NULL, 0)) {
            printf("Fuck this shit\n");
            exit(-1);
    }

    MYSQL_STMT *stmt = stmt = mysql_stmt_init(conn);

    if (!stmt) {
            cout << "Fuuuuu" << endl;
    }

    /* send SQL query */
   if (mysql_query(conn, "SELECT ni.name AS 'src', f.num as 'fbHits', n.num as 'nonFbHits', f.num / (n.num + f.num) AS 'percentOverall' FROM (SELECT p.src, count(1) AS num FROM packet p, reverse_lkp r WHERE p.dest = r.ip_address AND r.domain = 'facebook.com' AND p.src LIKE '192.168.%' GROUP BY p.src) f, (SELECT p.src, count(1) AS num FROM packet p, reverse_lkp r WHERE p.dest = r.ip_address AND r.domain != 'facebook.com' AND p.src LIKE '192.168.%' GROUP BY p.src) n, name_ip ni WHERE f.src = n.src AND f.src = ni.ip_address ORDER BY fbHits DESC;"))  {
     fprintf(stderr, "%s\n", mysql_error(conn));
      exit(1);
  }
   res = mysql_use_result(conn);
   /* output table name */
   //printf("MySQL Tables in mysql database:\n");
   /*while ((row = mysql_fetch_row(res)) != NULL) {
      printf("%s\n", row[3]);
   }*/
   /* close connection */
   row = mysql_fetch_row(res);
   string temp = row[3];
   int almostDone = atof(temp.c_str()) * 100;
   return almostDone/10;
   mysql_free_result(res);
   mysql_close(conn);
}
