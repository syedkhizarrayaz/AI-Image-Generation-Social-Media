import FileSaver from 'file-saver';
import { surpriseMePrompts } from '../constant';

// get random prompt from surpriseMePrompts
export function getRandomPrompt(prompt) {
  // get random index
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];
  // if random prompt is the same as the current prompt, get another random prompt
  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}
// function to download image
export async function downloadImage(_id, photo) {
  // save image to local
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
