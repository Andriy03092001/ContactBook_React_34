import React, { Fragment } from "react";
import "./ContactList.css";
import ContactItem from "../ContactItem/ContactItem";

const ContactList = ({ Data, changeFavorite, deleteContact, editContact }) => {

    var singleContact;
    if (Data != null) {
        singleContact = Data.map(item => {
            return (
                <ContactItem
                    key={item.id}
                    name={item.name}
                    phone={item.phone}
                    email={item.email}
                    address={item.address}
                    gender={item.gender}
                    avatar={item.avatar}
                    isFavorite={item.isFavorite}
                    changeFavorite={() => changeFavorite(item.id)}
                    deleteContact={() => deleteContact(item.id)}
                    editContact={() => editContact(item.id)}
                ></ContactItem>
            );
        });
    }

    return (
        <Fragment>
            <ul className="list">
                {singleContact}
            </ul>
        </Fragment>
    )
}

export default ContactList;