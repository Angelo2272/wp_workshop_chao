FROM wordpress:latest

# 1.Install dependencies
RUN apt-get update && apt-get install -y git unzip && rm -rf /var/lib/apt/lists/*


RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    chmod +x wp-cli.phar && mv wp-cli.phar /usr/local/bin/wp

# 3. Instalar Composer desde la imagen oficial
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

#c omposer and plugins install
COPY etc/config/composer.json /var/www/html/
RUN composer install --no-interaction --no-dev --optimize-autoloader

# 5. Copiar configuraciones y temas
COPY ./etc/config/wp-config.php /var/www/html/wp-config.php
COPY ../../ /var/www/html/wp-content/themes/fast-theme/

# 6. Corregir permisos al final
RUN chown -R www-data:www-data /var/www/html