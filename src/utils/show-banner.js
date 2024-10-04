import figlet from 'figlet';
import lolcatjs from 'lolcatjs';

export function showBanner(text, font = 'Roman') {
  figlet.text(text, { font }, function (err, data) {
    if (err) {
      console.error('Error with figlet:', err);
      return;
    }
    lolcatjs.fromString(data);
  });
}
