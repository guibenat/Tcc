CREATE DATABASE IF NOT EXISTS libras_db;
USE libras_db;
CREATE TABLE IF NOT EXISTS conteudo_libras (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  video_url VARCHAR(500),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO conteudo_libras (titulo, descricao, video_url)
VALUES ('Primeiros passos', 'Aprenda o basico em libras.', 'http://www.youtube.com/watch?v=ARX0sl6apCw');
SELECT * FROM conteudo_libras;