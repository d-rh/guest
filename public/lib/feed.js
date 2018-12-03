import { reply } from './modules/reply.js';
import { deleteEntry } from './modules/deleteEntry.js'

window.onload = () => {
  reply();
  deleteEntry();
}