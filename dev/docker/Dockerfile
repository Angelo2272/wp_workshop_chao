FROM wordpress:latest

# Install WP-CLI globally
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    chmod +x wp-cli.phar && mv wp-cli.phar /usr/local/bin/wp

# Set working directory
WORKDIR /var/www/html

# Copy the custom wp-config.php for development
COPY ./config/wp-config.php /var/www/html/wp-config.php

# Copy the theme files
COPY ../../ /var/www/html/wp-content/themes/wps-theme/

# Fix permissions
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html
