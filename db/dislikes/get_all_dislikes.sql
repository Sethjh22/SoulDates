SELECT * FROM dislikes
INNER JOIN dates ON dislikes.date_id = dates.date_id
WHERE user_id = ($1)