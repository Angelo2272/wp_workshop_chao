<?php

function wps_theme_setup(): void {
    add_theme_support( 'title-tag' );
    
    add_theme_support( 'post-thumbnails' );

    register_nav_menus( array(
        'primary' => __( 'Primary Menu', 'wps-theme' ),
        'footer' => __( 'Footer Menu', 'wps-theme' ),
    ) );

    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ) );

    remove_action( 'wp_head', 'wp_generator' );
}
add_action( 'after_setup_theme', 'wps_theme_setup' );

function wps_theme_scripts(): void {
    wp_enqueue_style( 'wps-theme-style', get_stylesheet_uri(), array(), wp_get_theme()->get( 'Version' ) );

    wp_enqueue_script( 'wps-theme-script', get_template_directory_uri() . '/dist/index.js', array(), wp_get_theme()->get( 'Version' ), true );

    wp_localize_script( 'wps-theme-script', 'themeSettings', array(
        'ajaxUrl' => admin_url( 'admin-ajax.php' ),
    ) );
}
add_action( 'wp_enqueue_scripts', 'wps_theme_scripts' );

function add_defer_attribute( $tag, $handle ): mixed {
    if ( 'wps-theme-script' === $handle ) {
        return str_replace( search: ' src', replace: ' defer="defer" src', subject: $tag );
    }
    return $tag;
}
add_filter( 'script_loader_tag', 'add_defer_attribute', 10, 2 );

