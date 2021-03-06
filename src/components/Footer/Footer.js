import React from 'react';
import {
	Container,
	Divider,
	Grid,
	Header,
	List,
	Segment,
} from 'semantic-ui-react';

const style = {
	// position: 'absolute',
	bottom: 0,
	width: '100%',
	overflow:'hidden'
};

const Footer = () => (
	<Segment id="footer" inverted vertical style={style}>
		<Container textAlign='center'>
			<Grid divided inverted stackable>
				<Grid.Row>
					<Grid.Column width={3}>
						{/* <Header inverted as='h4' content='Group 1' /> */}
						<List link inverted>
							{/* <List.Item as='a'>Link One</List.Item> */}
							{/* <List.Item as='a'>Link Two</List.Item> */}
							{/* <List.Item as='a'>Link Three</List.Item> */}
							{/* <List.Item as='a'>Link Four</List.Item> */}
						</List>
					</Grid.Column>
					<Grid.Column width={3}>
						<Header inverted as='h4' content='Uriel Cookies Incorporated 2021' />
						<p>
							{/* Extra space for a call to action inside the footer that could help re-engage users. */}
						</p>
					</Grid.Column>
				</Grid.Row>
			</Grid>

			<Divider inverted section />
			{/* <Image centered size='mini' src='http://tintex.co.uk/wp-content/uploads/2014/11/car-icon-white.png' /> */}
			<List horizontal inverted divided link>
				<List.Item as='a' href='#'>
          Site Map
				</List.Item>
				<List.Item as='a' href='#'>
          Contact Us
				</List.Item>
				<List.Item as='a' href='#'>
          Terms and Conditions
				</List.Item>
				<List.Item as='a' href='#'>
          Privacy Policy
				</List.Item>
			</List>
		</Container>
	</Segment>
);

export default Footer;