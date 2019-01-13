pg_dump -f bin/scheme.sql -U postgres -s terminated_games
pg_dump --inserts --data-only -t article_category -f bin/article_category.sql -U postgres terminated_games
pg_dump --inserts --data-only -t article_category_access -f bin/article_category_access.sql -U postgres terminated_games
pg_dump --inserts --data-only -t company_legal_type -f bin/company_legal_type.sql -U postgres terminated_games
pg_dump --inserts --data-only -t company_legal_switch -f bin/company_legal_switch.sql -U postgres terminated_games
pg_dump --inserts --data-only -t company_legal_region -f bin/company_legal_region.sql -U postgres terminated_games
pg_dump --inserts --data-only -t currency_type -f bin/currency_type.sql -U postgres terminated_games
pg_dump --inserts --data-only -t flag_type -f bin/flag_type.sql -U postgres terminated_games
pg_dump --inserts --data-only -t forum_access -f bin/forum_access.sql -U postgres terminated_games
pg_dump --inserts --data-only -t forum -f bin/forum.sql -U postgres terminated_games
pg_dump --inserts --data-only -t games -f bin/games.sql -U postgres terminated_games
pg_dump --inserts --data-only -t game_account_detail_type -f bin/game_account_detail_type.sql -U postgres terminated_games
pg_dump --inserts --data-only -t profile_password_type -f bin/profile_password_type.sql -U postgres terminated_games
pg_dump --inserts --data-only -t session_type -f bin/session_type.sql -U postgres terminated_games
pg_dump --inserts --data-only -t support_access -f bin/support_access.sql -U postgres terminated_games
pg_dump --inserts --data-only -t support_category -f bin/support_category.sql -U postgres terminated_games
pg_dump --inserts --data-only -t transaction_detail_type -f bin/transaction_detail_type.sql -U postgres terminated_games
pg_dump --inserts --data-only -t transaction_state_type -f bin/transaction_state_type.sql -U postgres terminated_games
node truncate article_category article_category_access company_legal_type company_legal_switch company_legal_region currency_type flag_type forum_access forum games game_account_detail_type profile_password_type session_type support_access support_category transaction_detail_type transaction_state_type
pause