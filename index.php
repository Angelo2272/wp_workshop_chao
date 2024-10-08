<?php
get_header(); ?>

<main id="main-content">
    <?php
    if ( have_posts() ) {
        while ( have_posts() ) {
            the_post();
            the_content();
        }
    } else {
        echo '<p>No content found</p>';
    }
    ?>
    
</main>

<?php get_footer(); ?>
