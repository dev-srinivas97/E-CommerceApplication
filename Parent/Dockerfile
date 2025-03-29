# Base image with JBoss/WildFly
FROM jboss/wildfly:27.0.1.Final

# Set environment variables for JBoss
ENV JBOSS_HOME /opt/jboss/wildfly
ENV DEPLOYMENTS_DIR $JBOSS_HOME/standalone/deployments

# Copy the WAR file into the JBoss deployment directory
COPY eCommerce/target/eCommerce.war $DEPLOYMENTS_DIR/eCommerce.war

# Add admin user to JBoss
RUN $JBOSS_HOME/bin/add-user.sh admin admin123 --silent

# Expose JBoss ports (8080 for HTTP and 9990 for management)
EXPOSE 8080 9990

# Run JBoss with binding to all IPs
CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0"]
