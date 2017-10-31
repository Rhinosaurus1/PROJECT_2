
INSERT INTO user (user_name, login_name, password) VALUES ('team', 'team-name', '123');


INSERT INTO bills (user_id, bill_name, bill_category) VALUES (1, 'Mortgage', 'Housing');
INSERT INTO bills (user_id, bill_name, bill_category) VALUES (1, 'Electricity - Illuminating Co.', 'Utilities');
INSERT INTO bills (user_id, bill_name, bill_category) VALUES (1, 'Gas - Dominion', 'Utilities');
INSERT INTO bills (user_id, bill_name, bill_category) VALUES (1, 'Capital One', 'Credit Cards');
INSERT INTO bills (user_id, bill_name, bill_category) VALUES (1, 'Visa', 'Credit Cards');
INSERT INTO bills (user_id, bill_name, bill_category) VALUES (1, 'Cable TV', 'Utilities');


INSERT INTO payments (bill_id, month_due) VALUES (1, '2017-11-01');
INSERT INTO payments (bill_id, month_due) VALUES (2, '2017-11-01');
INSERT INTO payments (bill_id, month_due) VALUES (3, '2017-11-01');
INSERT INTO payments (bill_id, month_due) VALUES (4, '2017-11-01');
INSERT INTO payments (bill_id, month_due) VALUES (5, '2017-12-01');
INSERT INTO payments (bill_id, month_due) VALUES (6, '2017-10-01');