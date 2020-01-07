<?php
/**
 * Register post meta.
 *
 * @package   Sidetrack
 * @author    Jeffrey Carandang from Sidetrack
 * @link      https://sidetrack.com
 * @license   http://opensource.org/licenses/gpl-2.0.php GNU Public License
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Sidetrack_Post_Meta Class
 *
 * @since 1.6.0
 */
class Sidetrack_Post_Meta {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_filter( 'init', array( $this, 'register_meta' ) );
		add_filter( 'rest_pre_dispatch', array( $this, 'rest_pre_dispatch' ), 10, 3 );
	}

	/**
	 * Register meta.
	 */
	public function register_meta() {
		register_meta(
			'post',
			'_sidetrack_title_hidden',
			array(
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'boolean',
				'auth_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
			)
		);

		register_meta(
			'post',
			'_sidetrack_reading_time',
			array(
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'number',
				'auth_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}

	/**
	 * Fix REST API issue with blocks registered via PHP register_block_type.
	 *
	 * @param mixed  $result  Response to replace the requested version with.
	 * @param object $server  Server instance.
	 * @param object $request Request used to generate the response.
	 *
	 * @return array Returns updated results.
	 */
	public function rest_pre_dispatch( $result, $server, $request ) {

		if ( strpos( $request->get_route(), '/wp/v2/block-renderer' ) !== false ) {

			if ( isset( $request['attributes'] ) && isset( $request['attributes']['sidetrack'] ) ) {

				$attributes = $request['attributes'];
				unset( $attributes['sidetrack'] );
				$request['attributes'] = $attributes;
			}
		}

		return $result;
	}
}

return new Sidetrack_Post_Meta();
