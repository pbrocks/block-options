/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { compose, ifCondition } = wp.compose;
const { PluginPostStatusInfo } = wp.editPost;
const { select, withSelect, withDispatch } = wp.data;
const { withSpokenMessages, CheckboxControl } = wp.components;

class DisableTitle extends Component {
	constructor() {
		super( ...arguments );

		this.initialize = this.initialize.bind( this );
	}

	componentDidMount() {
		this.initialize();
	}

	componentDidUpdate() {
		this.initialize();
	}

	initialize() {
		const { isDisabled, postmeta } = this.props;

		const titleBlock = document.querySelector( '.editor-post-title__block' );

		if ( titleBlock ) {
			const isHidden = typeof postmeta !== 'undefined' && typeof postmeta._sidetrack_title_hidden !== 'undefined' ? postmeta._sidetrack_title_hidden : false;
			const bodyClass = isHidden ? 'sidetrack-title-hidden' : 'sidetrack-title-visible';

			//remove existing class
			if ( isHidden ) {
				document.body.classList.remove( 'sidetrack-title-visible' );
			} else {
				document.body.classList.remove( 'sidetrack-title-hidden' );
			}

			document.body.classList.add( bodyClass );

			//hide if disabled
			if ( isDisabled ) {
				document.body.classList.add( 'sidetrack-title-visible-disabled' );
			} else {
				document.body.classList.remove( 'sidetrack-title-visible-disabled' );
			}
		}
	}

	render() {
		const { onToggle, postmeta, posttype } = this.props;

		if ( [ 'wp_block' ].includes( posttype ) ) {
			return false;
		}

		const isHidden = typeof postmeta !== 'undefined' && typeof postmeta._sidetrack_title_hidden !== 'undefined' ? postmeta._sidetrack_title_hidden : false;

		return (
			<PluginPostStatusInfo>
				<CheckboxControl
					className="sidetrack-hide-title-label"
					label={ __( 'Hide ' + posttype + ' Title', 'blockshop-options' ) }
					checked={ isHidden }
					onChange={ onToggle }
					help={ isHidden ? __( 'Title is hidden on your website.', 'blockshop-options' ) : null }
				/>
			</PluginPostStatusInfo>
		);
	}
}

export default compose(
	withSelect( () => {
		return {
			posttype: select( 'core/editor' ).getEditedPostAttribute( 'type' ),
			postmeta: select( 'core/editor' ).getEditedPostAttribute( 'meta' ),
			isDisabled: select( 'core/edit-post' ).isFeatureActive( 'disableSidetrackToggleTitleTools' ),
		};
	} ),
	withDispatch( ( dispatch, ownProps ) => {
		let metavalue;
		if ( typeof ownProps.postmeta !== 'undefined' && typeof ownProps.postmeta._sidetrack_title_hidden !== 'undefined' ) {
			metavalue = ownProps.postmeta._sidetrack_title_hidden;
		}
		return {
			onToggle() {
				dispatch( 'core/editor' ).editPost( {
					meta: {
						_sidetrack_title_hidden: ! metavalue,
					},
				} );
			},
		};
	} ),
	ifCondition( ( props ) => {
		return ! props.isDisabled;
	} ),
	withSpokenMessages,
)( DisableTitle );
