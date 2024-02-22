function popMessage() {
  const makeKeySequenceListener = (keySequence, callback) => {
    let index = 0;
    return (e) => {
      // Keystroke matches the target one for our current position
      if (e.key === keySequence[index]) {
        // Success! Invoke the callback.
        if (index === keySequence.length - 1) {
          callback();
        }
        // Move up, wrapping as needed
        index = (index + 1) % keySequence.length;
      } else {
        // Key didn't match; start over
        index = 0;
      }
    };
  };

  const listener = makeKeySequenceListener('1337', () => alert('HEJ HOPP!'));
  document.addEventListener('keyup', listener);
}

function changeBackground() {
  const header = document.querySelector('header');
  const myColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  header.style.backgroundColor = myColor;
}
