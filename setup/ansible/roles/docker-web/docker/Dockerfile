FROM centos

RUN yum -y install initscripts MAKEDEV
RUN yum check
RUN yum -y update
RUN yum -y install httpd

ENTRYPOINT ["/usr/sbin/httpd"]
CMD ["-D", "FOREGROUND"]
