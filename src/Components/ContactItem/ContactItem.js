import React, { Fragment, Component } from "react";
import "./ContactItem.css";
import { Link } from "react-router-dom";

class ContactItem extends Component {

    state = {
        name: this.props.name,
        phone: this.props.phone,
        email: this.props.email,
        address: this.props.address,
        gender: this.props.gender,
        avatar: this.props.avatar,
        isFavorite: this.props.isFavorite
    };

    randomImage() {
        const randomAvatar = Math.floor(Math.random() * Math.floor(99));
        this.setState({
            avatar: randomAvatar
        });
    }

    // setStar() {
    //     this.setState({
    //         isFavorite: !this.state.isFavorite
    //     })
    // }

    render() {
        const { phone, email, address, avatar } = this.state;
        const URL = `https://api.randomuser.me/portraits/${this.state.gender}/${avatar}.jpg`;

        let starStyle = "fa fa-star-o fa-2x  star";
        if (this.props.isFavorite === true) {
            starStyle = "fa fa-star fa-2x  star"
        }

        return (
            <Fragment>
                <li className="contact-item">
                    <img src={URL} alt="contact iamge"></img>
                    <h2>
                        {this.state.name}
                    </h2>

                    <p>{phone}</p>
                    <p>{email}</p>
                    <p>{address}</p>
                    <button className="btn btn-info" onClick={this.randomImage.bind(this)}>Random img</button>

                    <i onClick={this.props.changeFavorite} className={starStyle} aria-hidden="true"></i>
                    <i onClick={this.props.deleteContact} className="fa fa-trash-o fa-2x trash" ></i>
                    <Link to="/editContact">
                        <i onClick={this.props.editContact} className="fa fa-pencil-square-o fa-2x edit" ></i>
                    </Link>

                </li>
            </Fragment >
        )
    }
}

export default ContactItem;