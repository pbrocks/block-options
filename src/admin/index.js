/**
 * Internal dependencies
 */
import SidetrackDocs from './docs';
import FeaturesManager from '../extensions/components/manager/components/manager';
import BlockManager from './block-manager/';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { registerCoreBlocks } = wp.blockLibrary;
const { Fragment, Component, RawHTML, render } = wp.element;
const { TabPanel, Panel, PanelBody, PanelRow } = wp.components;

class SidetrackSettings extends Component {
	render() {
		const SidetrackSettingsPanel = () => (
			<TabPanel className="sidetrack-settings-tab-panel"
				activeClass="active-tab"
				tabs={ [
					{
						name: 'ek-getting-started',
						title: 'Getting Started',
						className: 'ek-settings-getting-started',
					},
					{
						name: 'ek-docs',
						title: 'Tutorial and Docs',
						className: 'ek-settings-docs',
					},
					{
						name: 'ek-features-manager',
						title: 'Features Manager',
						className: 'ek-settings-features-manager',
					},
					{
						name: 'ek-blocks-manager',
						title: 'Blocks Manager',
						className: 'ek-settings-blocks-manager',
					},
				] }>
				{
					( tab ) => {
						switch ( tab.name ) {
							case 'ek-getting-started':
								return (
									<Fragment>
										<div className="sidetrack-started-items-wrapper">
											<div className="sidetrack-started-item">
												<p>{ __( 'Sidetrack provides set of tools to extend the way you are building content on WordPress Gutenberg block editor. Designed and integrated to help users easily navigate; and control each block the way it should be.', 'blockshop-options' ) }</p>
											</div>
											<div className="sidetrack-started-item">
												<iframe title={ __( 'Sidetrack video preview', 'blockshop-options' ) } width="560" height="380" src="https://www.youtube.com/embed/QWgO4lAJAlE" frameBorder="0" allowFullScreen></iframe>
											</div>
											<div className="sidetrack-started-item">
												<RawHTML>
													{ sprintf(
														__( 'If you have any questions or suggestion, let us know through %1$sTwitter%4$s or our %2$sFacebook community %4$s. Also, %3$ssubscribe to our newsletter%4$s if you want to stay up to date with what\'s new and upcoming at Sidetrack.', 'blockshop-options' ),
														'<a href="https://twitter.com/sidetrack" target="_blank">',
														'<a href="https://www.facebook.com/groups/1306393256173179/" target="_blank">',
														'<a href="https://sidetrack.com/" target="_blank">',
														'</a>'
													) }
												</RawHTML>
											</div>
										</div>
									</Fragment>
								);

							case 'ek-docs':
								return (
									<SidetrackDocs />
								);

							case 'ek-features-manager':
								return (
									<Fragment>
										<p>{ __( 'All features are active by default but you have complete control over each one of them. Disable any features do not want to use and re-enable them anytime on this page or under the "Sidetrack Settings" on Gutenberg editor. Just uncheck the box and it will automatically be saved.', 'blockshop-options' ) }</p>
										<div className="sidetrack-features-manager-items-wrapper">
											<FeaturesManager />
										</div>
									</Fragment>
								);

							case 'ek-blocks-manager':
								return (
									<Fragment>
										<p>{ __( 'Manage each individual blocks! You can enable or disable any blocks you want and it will be reflected on Gutenberg block manager settings. Just uncheck the box and it will automatically be saved.', 'blockshop-options' ) }</p>
										<BlockManager />
									</Fragment>

								);
						}
					}
				}
			</TabPanel>
		);

		const MainPanel = () => (
			<Panel>
				<PanelBody
					opened={ true }
				>
					<div className="components-panel__header">
						<p className="sidetrack-panel__header-hint">{ __( 'Settings → Sidetrack', 'blockshop-options' ) }</p>
						<h2>{ __( 'Getting Started with', 'blockshop-options' ) } <strong>Sidetrack</strong><code>{ window.sidetrackSettings.version }</code></h2>
						<p>{ __( 'Congratulations! You\'ve just unlocked more Gutenberg block editor tools for easier editing and better workflow. Check more information about the plugin below and please make sure to navigate through "Tutorials and Docs" tab to learn more on how to use each available features.', 'blockshop-options' ) }</p>
					</div>
					<PanelRow>
						<SidetrackSettingsPanel />
					</PanelRow>
				</PanelBody>
			</Panel>
		);

		return (
			<Fragment>
				<MainPanel />
			</Fragment>
		);
	}
}

wp.domReady( () => {
	registerCoreBlocks();
	render(
		<SidetrackSettings />,
		document.querySelector( '.sidetrack-settings-wrap' )
	);
} );
