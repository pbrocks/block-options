<?php
/**
 * Add editor settings for Sidetrack features manager.
 *
 * @package   Sidetrack
 * @author    Jeffrey Carandang
 * @link      https://sidetrack.com
 * @license   http://opensource.org/licenses/gpl-2.0.php GNU Public License
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load general assets for our blocks.
 *
 * @since 1.0.0
 */
class Sidetrack_Features_Manager {


	/**
	 * This plugin's instance.
	 *
	 * @var Sidetrack_Features_Manager
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new Sidetrack_Features_Manager();
		}
	}

	/**
	 * The base URL path (without trailing slash).
	 *
	 * @var string $url
	 */
	private $url;

	/**
	 * The Plugin version.
	 *
	 * @var string $version
	 */
	private $version;

	/**
	 * The Plugin version.
	 *
	 * @var string $slug
	 */
	private $slug;


	/**
	 * The Constructor.
	 */
	private function __construct() {
		$this->version = EDITORSKIT_VERSION;
		$this->slug    = 'sidetrack';
		$this->url     = untrailingslashit( plugins_url( '/', dirname( __FILE__ ) ) );

		add_filter( 'block_editor_settings', array( $this, 'block_editor_settings' ), 10, 2 );
	}

	/**
	 * Filters the settings to pass to the block editor.
	 *
	 * @param array  $editor_settings The editor settings.
	 * @param object $post The post being edited.
	 *
	 * @return array Returns updated editors settings.
	 */
	public function block_editor_settings( $editor_settings, $post ) {
		if ( ! isset( $editor_settings['sidetrack'] ) ) {

			$editor_settings['sidetrack'] = array(
				'visibility' => array(
					'name'  => 'visibility',
					'label' => __( 'Visibility', 'blockshop-options' ),
					'items' => array(
						'acf'       => array(
							'name'  => 'acf',
							'label' => __( 'ACF Support', 'blockshop-options' ),
							'value' => true,
						),
						'devices'   => array(
							'name'  => 'devices',
							'label' => __( 'Devices', 'blockshop-options' ),
							'value' => true,
						),
						'logic'     => array(
							'name'  => 'logic',
							'label' => __( 'Display Logic', 'blockshop-options' ),
							'value' => true,
						),
						'userState' => array(
							'name'  => 'userState',
							'label' => __( 'User Login State', 'blockshop-options' ),
							'value' => true,
						),
					),
				),
				'formats'    => array(
					'name'  => 'formats',
					'label' => __( 'Formats', 'blockshop-options' ),
					'items' => array(
						'abbreviation'     => array(
							'name'  => 'abbreviation',
							'label' => __( 'Abbreviation', 'blockshop-options' ),
							'value' => true,
						),
						'clearFormatting'  => array(
							'name'  => 'clearFormatting',
							'label' => __( 'Clear Formatting', 'blockshop-options' ),
							'value' => true,
						),
						'highlight'        => array(
							'name'  => 'highlight',
							'label' => __( 'Highlighted Text Color', 'blockshop-options' ),
							'value' => true,
						),
						'justify'          => array(
							'name'  => 'justify',
							'label' => __( 'Justified Alignment', 'blockshop-options' ),
							'value' => true,
						),
						'link'             => array(
							'name'  => 'link',
							'label' => __( 'Link with "rel" Attributes', 'blockshop-options' ),
							'value' => true,
						),
						'nonbreakingSpace' => array(
							'name'  => 'nonbreakingSpace',
							'label' => __( 'Nonbreaking Space', 'blockshop-options' ),
							'value' => true,
						),
						'subscript'        => array(
							'name'  => 'subscript',
							'label' => __( 'Subscript', 'blockshop-options' ),
							'value' => true,
						),
						'superscript'      => array(
							'name'  => 'superscript',
							'label' => __( 'Superscript', 'blockshop-options' ),
							'value' => true,
						),
						'colors'           => array(
							'name'  => 'colors',
							'label' => __( 'Text Color', 'blockshop-options' ),
							'value' => true,
						),
						'underline'        => array(
							'name'  => 'underline',
							'label' => __( 'Underline', 'blockshop-options' ),
							'value' => true,
						),
						'uppercase'        => array(
							'name'  => 'uppercase',
							'label' => __( 'Uppercase', 'blockshop-options' ),
							'value' => true,
						),
					),
				),
				'writing'    => array(
					'name'  => 'writing',
					'label' => __( 'Writing', 'blockshop-options' ),
					'items' => array(
						'readingTime'    => array(
							'name'  => 'readingTime',
							'label' => __( 'Estimated Reading Time', 'blockshop-options' ),
							'value' => true,
						),
						'headingLabel'   => array(
							'name'  => 'headingLabel',
							'label' => __( 'Heading Block Label', 'blockshop-options' ),
							'value' => true,
						),
						'markdown'       => array(
							'name'  => 'markdown',
							'label' => __( 'Markdown', 'blockshop-options' ),
							'value' => true,
						),
						'transformEmpty' => array(
							'name'  => 'transformEmpty',
							'label' => __( 'Transform 4 Empty Paragraphs to Spacer Block', 'blockshop-options' ),
							'value' => true,
						),
					),
				),
				'options'    => array(
					'name'  => 'options',
					'label' => __( 'Block Options', 'blockshop-options' ),
					'items' => array(
						'buttonFullwidth'    => array(
							'name'  => 'buttonFullwidth',
							'label' => __( 'Button Block Full Width', 'blockshop-options' ),
							'value' => true,
						),
						'columnsBackground'  => array(
							'name'  => 'columnsBackground',
							'label' => __( 'Columns Block Background Color', 'blockshop-options' ),
							'value' => true,
						),
						'convertReusable'    => array(
							'name'  => 'convertReusable',
							'label' => __( 'Convert Reusable Block Toolbar', 'blockshop-options' ),
							'value' => true,
						),
						'copy'               => array(
							'name'  => 'copy',
							'label' => __( 'Copy Selected Block(s)', 'blockshop-options' ),
							'value' => true,
						),
						'coverAlignment'     => array(
							'name'  => 'coverAlignment',
							'label' => __( 'Cover Block Vertical Alignment', 'blockshop-options' ),
							'value' => true,
						),
						'navigator'          => array(
							'name'  => 'navigator',
							'label' => __( 'Block Navigator', 'blockshop-options' ),
							'value' => true,
						),
						'export'             => array(
							'name'  => 'export',
							'label' => __( 'Export as JSON', 'blockshop-options' ),
							'value' => true,
						),
						'listBlockFontSize'  => array(
							'name'  => 'listBlockFontSize',
							'label' => __( 'List Block Font Size', 'blockshop-options' ),
							'value' => true,
						),
						'listBlockTextColor' => array(
							'name'  => 'listBlockTextColor',
							'label' => __( 'List Block Text Color', 'blockshop-options' ),
							'value' => true,
						),
						'mediaTextLayout'    => array(
							'name'  => 'mediaTextLayout',
							'label' => __( 'Media Text Block Layout', 'blockshop-options' ),
							'value' => true,
						),
						'mediaTextLink'      => array(
							'name'  => 'mediaTextLink',
							'label' => __( 'Media Text Block Link', 'blockshop-options' ),
							'value' => true,
						),
						'setAsFeatured'      => array(
							'name'  => 'setAsFeatured',
							'label' => __( 'Set Image Block as Featured', 'blockshop-options' ),
							'value' => true,
						),
					),
				),
				'tools'      => array(
					'name'  => 'tools',
					'label' => __( 'Tools', 'blockshop-options' ),
					'items' => array(
						'guidelines'          => array(
							'name'  => 'guidelines',
							'label' => __( 'Block Guide Lines', 'blockshop-options' ),
							'value' => true,
						),
						'codeHighlight'       => array(
							'name'  => 'codeHighlight',
							'label' => __( 'Code Editor Syntax Highlight', 'blockshop-options' ),
							'value' => true,
						),
						'customClassNames'    => array(
							'name'  => 'customClassNames',
							'label' => __( 'Custom Class Names', 'blockshop-options' ),
							'value' => true,
						),
						'dragAndDropFeatured' => array(
							'name'  => 'dragAndDropFeatured',
							'label' => __( 'Drag and Drop Featured Image', 'blockshop-options' ),
							'value' => true,
						),
						'height'              => array(
							'name'  => 'height',
							'label' => __( 'Editor Min-Height', 'blockshop-options' ),
							'value' => true,
						),
						'autosave'            => array(
							'name'  => 'autosave',
							'label' => __( 'Toggle Auto Save', 'blockshop-options' ),
							'value' => true,
						),
						'help'                => array(
							'name'  => 'help',
							'label' => __( 'Help, tips and tricks', 'blockshop-options' ),
							'value' => true,
						),
						'toggleTitle'         => array(
							'name'  => 'toggleTitle',
							'label' => __( 'Toggle Title Visibility', 'blockshop-options' ),
							'value' => true,
						),
						'scrollDown'          => array(
							'name'  => 'scrollDown',
							'label' => __( 'View Custom Fields', 'blockshop-options' ),
							'value' => true,
						),
					),
				),
				'shortcuts'  => array(
					'name'  => 'shortcuts',
					'label' => __( 'Shortcuts', 'blockshop-options' ),
					'items' => array(
						'selectParent' => array(
							'name'  => 'selectParent',
							'label' => __( 'Select Parent Block', 'blockshop-options' ),
							'value' => true,
						),
					),
				),
			);
		}

		return $editor_settings;
	}

}

Sidetrack_Features_Manager::register();
