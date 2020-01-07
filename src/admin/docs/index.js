/**
 * Internal dependencies
 */
import icon from './icon';

/**
 * External dependencies
 */
import marked from 'marked';
import { map } from 'lodash';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment, Component } = wp.element;
const { Button, Modal } = wp.components;

class SidetrackDocs extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			isOpen: false,
			isLoaded: false,
			html: '',
		};
	}

	openModal( name ) {
		fetch( window.sidetrackSettings.url + 'docs/' + name )
			.then( ( response ) => response.text() )
			.then( ( markdown ) => this.setState( { html: marked( markdown ), isLoaded: true, isOpen: true } ) );
	}

	render() {
		const formatDocs = [
			{
				title: __( 'Adding Selected Text Color', 'blockshop-options' ),
				name: 'text-color-format.md',
			},
			{
				title: __( 'Adding Highlighted Text Background Color', 'blockshop-options' ),
				name: 'background-color-format.md',
			},
			{
				title: __( 'Adding Link "rel" NoFollow or Sponsored Attributes', 'blockshop-options' ),
				name: 'link-attributes-format.md',
			},
			{
				title: __( 'Subscript and Superscript Text Formatting', 'blockshop-options' ),
				name: 'subscript-superscript-format.md',
			},
			{
				title: __( 'Justified Paragraph Alignment', 'blockshop-options' ),
				name: 'justified-alignment-format.md',
			},
			{
				title: __( 'Transform Text to Uppercase', 'blockshop-options' ),
				name: 'uppercase-text-format.md',
			},
			{
				title: __( 'Add Nonbreaking Space', 'blockshop-options' ),
				name: 'nonbreaking-space-format.md',
			},
			{
				title: __( 'Clear Formatting', 'blockshop-options' ),
				name: 'clear-formatting-format.md',
			},
		];

		const writingDocs = [
			{
				title: __( 'Markdown Writing Shortcuts', 'blockshop-options' ),
				name: 'markdown-writing.md',
			},
			{
				title: __( 'View or Add Estimated Reading Time', 'blockshop-options' ),
				name: 'estimated-reading-time-writing.md',
			},
			{
				title: __( 'Transform 4 Empty Paragraphs to Spacer Block', 'blockshop-options' ),
				name: 'transform-empty-spacer-writing.md',
			},
		];

		const optionsDocs = [
			{
				title: __( 'Set Image Block as Featured Image', 'blockshop-options' ),
				name: 'set-image-as-featured-options.md',
			},
			{
				title: __( 'Export and Import Blocks', 'blockshop-options' ),
				name: 'export-import-blockshop-options.md',
			},
			{
				title: __( 'Copy Selected Block(s)', 'blockshop-options' ),
				name: 'copy-selected-blocks-options.md',
			},
			{
				title: __( 'Media & Text Block Card Layout', 'blockshop-options' ),
				name: 'media-text-block-layout-options.md',
			},
			{
				title: __( 'Media & Text Block Links', 'blockshop-options' ),
				name: 'media-text-block-link-options.md',
			},
			{
				title: __( 'Changing List Block Font Size & Text Color', 'blockshop-options' ),
				name: 'list-blockshop-options.md',
			},
		];

		const toolsDocs = [
			{
				title: __( 'Easily Hide Title', 'blockshop-options' ),
				name: 'hide-title-tools.md',
			},
			{
				title: __( 'Drag and Drop Featured Image', 'blockshop-options' ),
				name: 'drag-drop-featured-image-tools.md',
			},
			{
				title: __( 'Code Editor Syntax Highlighter', 'blockshop-options' ),
				name: 'syntax-highlighter-tools.md',
			},
			{
				title: __( 'Disable Auto Saving', 'blockshop-options' ),
				name: 'disable-autosave-tools.md',
			},
			{
				title: __( 'Enable Block Guide Lines', 'blockshop-options' ),
				name: 'block-guidelines-tools.md',
			},
			{
				title: __( 'Additional CSS Class(es) Auto Suggestions', 'blockshop-options' ),
				name: 'custom-classnames-tools.md',
			},
			{
				title: __( 'Accessible Help, Tips & Tricks', 'blockshop-options' ),
				name: 'tips-tricks-tools.md',
			},
			{
				title: __( 'Enable Developer Tools', 'blockshop-options' ),
				name: 'developer-tools.md',
			},
		];

		const visibilityDocs = [
			{
				title: __( 'Block Visibility on Desktop, Mobile or Tablet', 'blockshop-options' ),
				name: 'devices-visibility.md',
			},
			{
				title: __( 'Hide Block on Logged-in/out Users', 'blockshop-options' ),
				name: 'user-state-visibility.md',
			},
			{
				title: __( 'Using Custom Display Logic', 'blockshop-options' ),
				name: 'display-logic-visibility.md',
			},
		];

		const stylingDocs = [
			{
				title: __( 'Display Cover and Image Blocks in Fullscreen', 'blockshop-options' ),
				name: 'fullscreen-styling.md',
			},
			{
				title: __( 'More Image & Cover Block Styles', 'blockshop-options' ),
				name: 'image-cover-styles-styling.md',
			},
			{
				title: __( 'Additional List Block Styles', 'blockshop-options' ),
				name: 'list-block-styles-styling.md',
			},
		];

		const closeModal = () => (
			this.setState( { html: '', isOpen: false, isLoaded: false } )
		);

		return (
			<Fragment>
				<p>{ __( 'Learn more about each Sidetrack features with the tutorials below. Click on the link to open a modal pop-up with detailed explanation and animated GIF previewing how the features work.', 'blockshop-options' ) }</p>
				<div className="sidetrack-docs-items-wrapper">
					<div className="sidetrack-docs-items-formatting">
						<h3 className="sidetrack-docs-items-title">{ __( 'Rich Text Formatting', 'blockshop-options' ) }</h3>
						<ul className="sidetrack-docs-items-list">
							{ map( formatDocs, ( formats ) => {
								return (
									<li>
										<Button
											onClick={ () => {
												this.openModal( formats.name );
											} }>
											{ formats.title }
										</Button>
									</li>
								);
							} ) }
						</ul>
					</div>
					<div className="sidetrack-docs-items-writing">
						<h3 className="sidetrack-docs-items-title">{ __( 'Writing', 'blockshop-options' ) }</h3>
						<ul className="sidetrack-docs-items-list">
							{ map( writingDocs, ( formats ) => {
								return (
									<li>
										<Button
											onClick={ () => {
												this.openModal( formats.name );
											} }>
											{ formats.title }
										</Button>
									</li>
								);
							} ) }
						</ul>
					</div>
					<div className="sidetrack-docs-items-blockoptions">
						<h3 className="sidetrack-docs-items-title">{ __( 'Block Options', 'blockshop-options' ) }</h3>
						<ul className="sidetrack-docs-items-list">
							{ map( optionsDocs, ( formats ) => {
								return (
									<li>
										<Button
											onClick={ () => {
												this.openModal( formats.name );
											} }>
											{ formats.title }
										</Button>
									</li>
								);
							} ) }
						</ul>
					</div>
					<div className="sidetrack-docs-items-tools">
						<h3 className="sidetrack-docs-items-title">{ __( 'Tools', 'blockshop-options' ) }</h3>
						<ul className="sidetrack-docs-items-list">
							{ map( toolsDocs, ( formats ) => {
								return (
									<li>
										<Button
											onClick={ () => {
												this.openModal( formats.name );
											} }>
											{ formats.title }
										</Button>
									</li>
								);
							} ) }
						</ul>
					</div>
					<div className="sidetrack-docs-items-visibility">
						<h3 className="sidetrack-docs-items-title">{ __( 'Block Visibility', 'blockshop-options' ) }</h3>
						<ul className="sidetrack-docs-items-list">
							{ map( visibilityDocs, ( formats ) => {
								return (
									<li>
										<Button
											onClick={ () => {
												this.openModal( formats.name );
											} }>
											{ formats.title }
										</Button>
									</li>
								);
							} ) }
						</ul>
					</div>
					<div className="sidetrack-docs-items-styling">
						<h3 className="sidetrack-docs-items-title">{ __( 'Block Styling', 'blockshop-options' ) }</h3>
						<ul className="sidetrack-docs-items-list">
							{ map( stylingDocs, ( formats ) => {
								return (
									<li>
										<Button
											onClick={ () => {
												this.openModal( formats.name );
											} }>
											{ formats.title }
										</Button>
									</li>
								);
							} ) }
						</ul>
					</div>
				</div>
				{ this.state.isOpen && this.state.isLoaded ?
					<Modal
						title={ __( 'Documentation', 'blockshop-options' ) }
						icon={ icon.book }
						onRequestClose={ () => closeModal() }
						className="sidetrack-modal-component components-modal--sidetrack-docs"
					>
						<div className="components-modal--sidetrack-doc" dangerouslySetInnerHTML={ { __html: this.state.html } } />
					</Modal> : null }
			</Fragment>
		);
	}
}

export default SidetrackDocs;
