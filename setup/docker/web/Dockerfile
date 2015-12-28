FROM centos
RUN yum -y install initscripts MAKEDEV
RUN yum check
RUN yum -y update
RUN yum -y install openssh-server
RUN sed -ri 's/^#PermitRootLogin yes/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -ri 's/^UsePAM yes/UsePAM no/' /etc/ssh/sshd_config
RUN /etc/init.d/sshd start
RUN sed -ri 's/^(root):[^:]*:(.*)$/\1:*:\2/' /etc/shadow
                                    RUN ssh-keygen -f ~root/.ssh/id_rsa -t rsa -b 2048 -N ''
                                    RUN cp ~root/.ssh/id_rsa.pub ~root/.ssh/authorized_keys
                                    RUN chmod 0600 ~root/.ssh/authorized_keys
                                    EXPOSE 22
                                    CMD /sbin/init
