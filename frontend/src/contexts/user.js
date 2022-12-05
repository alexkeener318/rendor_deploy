/**
* This context serves as a global variable which contains info about the current user
* @author   David Asatryan
*/
import { createContext } from 'react'

export const UserContext = createContext({name: 'David', id:'00000', role:'Manager'});