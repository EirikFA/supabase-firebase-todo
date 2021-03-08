/* eslint-disable import/no-duplicates */
import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

import config from "./firebase.json";

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
