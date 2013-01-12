#include <iostream>
#include <winsock.h>
#include <mysql.h>
#include <string>
#include <stdio.h>
#include <sstream>

#define HAVE_REMOTE
#include "pcap.h"


using namespace std;


void packet_handler(u_char *param, const struct pcap_pkthdr *header, const u_char *pkt_data);

/* 4 bytes IP address */
typedef struct ip_address{
    u_char byte1;
    u_char byte2;
    u_char byte3;
    u_char byte4;
}ip_address;

/* IPv4 header */
typedef struct ip_header{
    u_char  ver_ihl;        // Version (4 bits) + Internet header length (4 bits)
    u_char  tos;            // Type of service
    u_short tlen;           // Total length
    u_short identification; // Identification
    u_short flags_fo;       // Flags (3 bits) + Fragment offset (13 bits)
    u_char  ttl;            // Time to live
    u_char  proto;          // Protocol
    u_short crc;            // Header checksum
    ip_address  saddr;      // Source address
    ip_address  daddr;      // Destination address
    u_int   op_pad;         // Option + Padding
}ip_header;

/* UDP header*/
typedef struct udp_header{
    u_short sport;          // Source port
    u_short dport;          // Destination port
    u_short len;            // Datagram length
    u_short crc;            // Checksum
}udp_header;

int count2;
MYSQL *conn;

int main()
{
    /*MySQL Connection*/
    MYSQL_RES *res;
    MYSQL_ROW row;
    char *server="192.168.2.1";
    char *user = "root";
    char *password = "fbhack2013$$";
    char *database = "fbhack";
    conn = mysql_init(NULL);
    if (!mysql_real_connect(conn, server, user, password, database, 0, NULL, 0)) {
            printf("Fuck this shit\n");
            exit(-1);
    }


    count2 = 0;

    pcap_if_t *alldevs;
    pcap_if_t *d;

    int i = 0;
    char errbuf[PCAP_ERRBUF_SIZE];
    pcap_t *adhandle;
    u_int netmask;
    char packet_filter[] = "ip and not port 3306";
    struct bpf_program fcode;

    /*Query all available devices*/
    if (pcap_findalldevs_ex(PCAP_SRC_IF_STRING, NULL, &alldevs, errbuf) == -1) {
        fprintf(stderr, "Error in pcap_findalldevs_ex: %s\n", errbuf);
        exit(1);
    }

    for (d = alldevs; d != NULL; d = d->next) {
            printf("%d. %s",++i, d->name);
            if (d -> description) {
                    printf(" (%s)\n", d->description);
            } else {
                printf(" (No description available)\n");
            }
    }

    if (i == 0) {
            printf("\nNo interfaces found! You dun goofed David\n");
            return 0;
    }

    //Choose the third interface
    for (d = alldevs, i = 0; i != 2; d = d->next, i++);

    if ( (adhandle = pcap_open(d -> name,
                               65536,
                               PCAP_OPENFLAG_PROMISCUOUS,
                               1000,
                               NULL,
                               errbuf) ) == NULL ) {
        fprintf(stderr, "\nUnable to open the adapter: %s is not supported\n", d->name);
        exit(-1);
    }

    if(d->addresses != NULL)
        /* Retrieve the mask of the first address of the interface */
        netmask=((struct sockaddr_in *)(d->addresses->netmask))->sin_addr.S_un.S_addr;
    else
        /* If the interface is without addresses we suppose to be in a C class network */
        netmask=0xffffff;

    //compile the filter
    if (pcap_compile(adhandle, &fcode, packet_filter, 1, netmask) <0 )
    {
        fprintf(stderr,"\nUnable to compile the packet filter. Check the syntax.\n");
        /* Free the device list */
        pcap_freealldevs(alldevs);
        return -1;
    }

    //set the filter
    if (pcap_setfilter(adhandle, &fcode)<0)
    {
        fprintf(stderr,"\nError setting the filter.\n");
        /* Free the device list */
        pcap_freealldevs(alldevs);
        return -1;
    }

    pcap_freealldevs(alldevs);


    pcap_loop(adhandle, 0, packet_handler, NULL);


    return 0;
}

void packet_handler(u_char *param, const struct pcap_pkthdr *header, const u_char *pkt_data) {

    struct tm ltime;
    char timestr[16];
    ip_header *ih;
    udp_header *uh;
    u_int ip_len;
    u_short sport,dport;
    time_t local_tv_sec;
    char buff[100];

    string dest;
    string src;
    string sizePckt;

    ih = (ip_header *) (pkt_data + 14);

    //Extract the source address
    sprintf (buff, "%d.%d.%d.%d", (ih->saddr).byte1, (ih->saddr).byte2, (ih->saddr).byte3, (ih->saddr).byte4);
    src = buff;
    //Extract the destination address
    sprintf (buff, "%d.%d.%d.%d", (ih->daddr).byte1, (ih->daddr).byte2, (ih->daddr).byte3, (ih->daddr).byte4);
    dest = buff;

    ostringstream convert;
    convert << ih->tlen;

    string qry = "INSERT INTO packet (src, dest, size) values ('";
    qry += src.c_str();
    qry += "','";
    qry += dest.c_str();
    qry += "'," + convert.str() + ")";

    convert.flush();

    cout << "Source: " << src << " Dest: " << dest << endl;

    if (mysql_query(conn, qry.c_str())) {
      fprintf(stderr, "%s\n", mysql_error(conn));
      exit(1);
   }




}


