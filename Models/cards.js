import db from '../config/db.js';

const card = {
  create: (data) => {
    const query = 'INSERT INTO products (titulo, autor) VALUES (?, ?)';
    db.execute(query, [data.titulo, data.autor], (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(result);
    });
  },
};

export default prod;