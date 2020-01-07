/**
 * Internal dependencies
 */

/**
 * WordPress dependencies
 */
const { withSelect } = wp.data;
const { compose } = wp.compose;
const { Component } = wp.element;
const { withSpokenMessages } = wp.components;

/**
 * Render plugin
 */
class HeadingLabel extends Component {
	componentDidMount() {
		this.sync();
	}

	componentDidUpdate() {
		this.sync();
	}

	sync() {
		const { isDisabled } = this.props;
		if ( ! isDisabled ) {
			document.body.classList.add( 'is-sidetrack-heading-label-on' );
		} else {
			document.body.classList.remove( 'is-sidetrack-heading-label-on' );
		}
	}

	render() {
		return null;
	}
}

export default compose( [
	withSelect( ( select ) => ( {
		isDisabled: select( 'core/edit-post' ).isFeatureActive( 'disableSidetrackHeadingLabelWriting' ),
	} ) ),
	withSpokenMessages,
] )( HeadingLabel );
