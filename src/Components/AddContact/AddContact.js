import React, { Fragment, Component } from "react";
import "./AddContact.css";
import { Redirect } from "react-router-dom";

class AddContact extends Component {

    state = {
        name: null,
        phone: null,
        address: null,
        avatar: null,
        email: null,
        isSended: false
    };
    getName(event) {
        this.setState({
            name: event.target.value
        })
    }
    getAddress(event) {
        this.setState({
            address: event.target.value
        })
    }
    getPhone(event) {
        this.setState({
            phone: event.target.value
        })
    }
    getAvatar(event) {
        this.setState({
            avatar: event.target.value
        })
    }
    getEmail(event) {
        this.setState({
            email: event.target.value
        })
    }

    sendData(event) {
        event.preventDefault();
        const { name, address, phone, email, avatar } = this.state;
        this.props.addContact(name, address, phone, email, avatar);
        this.setState({
            isSended: true
        })
    }

    render() {

        if (this.state.isSended === true) {
            return (<Redirect to="/"></Redirect>)
        }

        return (
            <Fragment>
                <form onSubmit={this.sendData.bind(this)}>
                    <div className="form-group">
                        <div className="form-group">
                            <label for="name">Name</label>
                            <input type="text" className="form-control" onChange={this.getName.bind(this)} />
                        </div>
                        <div className="form-group">
                            <label for="Address">Address</label>
                            <input type="text" className="form-control" onChange={this.getAddress.bind(this)} />
                        </div>
                        <div className="form-group">
                            <label for="Phone">Phone</label>
                            <input type="tel" className="form-control" onChange={this.getPhone.bind(this)} />
                        </div>
                        <div className="form-group">
                            <label for="Avatar">Avatar</label>
                            <input type="number" min="1" max="99" className="form-control" onChange={this.getAvatar.bind(this)} />
                        </div>
                        <label for="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={this.getEmail.bind(this)}
                        />
                    </div>
                    <div className="form-group form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                        />

                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                         </button>
                    {/* {this.state.name}
                    {this.state.email}
                    {this.state.phone}
                    {this.state.avatar}
                    {this.state.address} */}


                </form>
            </Fragment>
        )
    }
}

export default AddContact;