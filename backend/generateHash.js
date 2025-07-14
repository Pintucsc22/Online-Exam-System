const bcrypt = require('bcryptjs');

bcrypt.hash('password', 10, function(err, hash) {
  if (err) {
    console.error('Error generating hash:', err);
  } else {
    console.log('New Hash:', hash);
  }
});

