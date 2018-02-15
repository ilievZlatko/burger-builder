import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
		loading: false
	};

	orderHandler = (event) => {
		event.preventDefault();

		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Zlatko Iliev',
				address: {
					street: '123 main str.',
					zipcode: '9000',
					country: 'Bulgaria'
				},
				email: 'iliev.zlatko@gmail.com'
			},
			deliveryMethod: 'fastest'
		};
		axios.post('/orders.json', order)
			.then(response => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch(err => {
				this.setState({ loading: false });
				console.log(err);
			});
	};

	render() {
		let form = (
			<form>
				<input className={classes.Input} type="text" name="name" placeholder="Your Name" />
				<input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
				<input className={classes.Input} type="text" name="street" placeholder="Your street" />
				<input className={classes.Input} type="text" name="postal" placeholder="Postal code" />
				<Button btnType="Success" clicked={this.orderHandler}>Order</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
