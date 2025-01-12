CREATE TABLE IF NOT EXISTS scores ( id SERIAL PRIMARY KEY,
                                                      player_name VARCHAR(50) NOT NULL,
                                                                              score INTEGER NOT NULL,
                                                                                            country_code CHAR(2) NOT NULL,
                                                                                                                 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);


CREATE INDEX idx_scores_score ON scores(score DESC);


CREATE INDEX idx_scores_country_code ON scores(country_code);