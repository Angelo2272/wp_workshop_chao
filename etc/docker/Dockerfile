FROM wordpress:latest

# 1. Instalar dependencias
RUN apt-get update && apt-get install -y git unzip && rm -rf /var/lib/apt/lists/*

# 2. Instalar WP-CLI
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    chmod +x wp-cli.phar && mv wp-cli.phar /usr/local/bin/wp

# 3. Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/staging

# 5. Copiar composer e instalar
COPY etc/config/composer.json ./
# Asegúrate de que tu composer.json instale los plugins en la ruta relativa correcta
RUN composer install --no-interaction --no-dev --optimize-autoloader

# 6. Copiar temas y configs
COPY ./etc/config/wp-config.php ./wp-config.php

# Nota: Ajusta la ruta de origen según tu estructura de carpetas real
COPY ../../ ./wp-content/themes/fast-theme/

# 7. Permisos
RUN chown -R www-data:www-data /var/www/staging