--
-- PostgreSQL database dump
--

-- Dumped from database version 11.1
-- Dumped by pg_dump version 11.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: article; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.article (
    uuid uuid,
    category uuid,
    added date,
    device uuid,
    title "char",
    slug "char"
);


ALTER TABLE public.article OWNER TO terminated_games;

--
-- Name: article_category; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.article_category (
    uuid uuid NOT NULL
);


ALTER TABLE public.article_category OWNER TO terminated_games;

--
-- Name: article_category_access; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.article_category_access (
    uuid uuid,
    flag uuid,
    related_article_category uuid,
    added date,
    device uuid
);


ALTER TABLE public.article_category_access OWNER TO terminated_games;

--
-- Name: article_content; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.article_content (
    uuid uuid NOT NULL,
    related uuid,
    value text,
    related_article uuid,
    added date,
    device uuid
);


ALTER TABLE public.article_content OWNER TO terminated_games;

--
-- Name: article_meta; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.article_meta (
    uuid uuid NOT NULL,
    related_article uuid,
    type uuid,
    value "char",
    added date,
    device uuid
);


ALTER TABLE public.article_meta OWNER TO terminated_games;

--
-- Name: balance; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.balance (
    uuid uuid,
    related uuid,
    amount integer,
    currency_type uuid,
    device uuid
);


ALTER TABLE public.balance OWNER TO terminated_games;

--
-- Name: company_legal; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.company_legal (
    uuid uuid NOT NULL,
    locale "char",
    type uuid,
    added date,
    region uuid,
    device uuid
);


ALTER TABLE public.company_legal OWNER TO terminated_games;

--
-- Name: company_legal_region; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.company_legal_region (
    uuid uuid NOT NULL,
    name "char",
    title "char",
    description "char",
    added date,
    switch uuid
);


ALTER TABLE public.company_legal_region OWNER TO terminated_games;

--
-- Name: company_legal_switch; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.company_legal_switch (
    uuid uuid NOT NULL,
    contry_code "char",
    locale "char",
    name "char",
    title "char",
    description "char",
    added date
);


ALTER TABLE public.company_legal_switch OWNER TO terminated_games;

--
-- Name: company_legal_type; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.company_legal_type (
    uuid uuid NOT NULL,
    name "char",
    description "char",
    title "char"
);


ALTER TABLE public.company_legal_type OWNER TO terminated_games;

--
-- Name: currency_type; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.currency_type (
    uuid uuid NOT NULL,
    description "char",
    name "char",
    title "char"
);


ALTER TABLE public.currency_type OWNER TO terminated_games;

--
-- Name: device; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.device (
    uuid uuid NOT NULL,
    remote_address character varying(45),
    name character varying(255),
    added timestamp(4) without time zone,
    last_modification timestamp(4) without time zone,
    agent character varying(255),
    proxy character varying
);


ALTER TABLE public.device OWNER TO terminated_games;

--
-- Name: flag; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.flag (
    uuid uuid NOT NULL,
    related uuid,
    type uuid,
    added date,
    invalidated date
);


ALTER TABLE public.flag OWNER TO terminated_games;

--
-- Name: flag_type; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.flag_type (
    uuid uuid NOT NULL,
    name "char",
    title "char",
    description "char"
);


ALTER TABLE public.flag_type OWNER TO terminated_games;

--
-- Name: forum; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.forum (
    uuid uuid NOT NULL,
    description "char",
    locale "char",
    title "char",
    added date,
    name "char",
    icon uuid,
    device uuid
);


ALTER TABLE public.forum OWNER TO terminated_games;

--
-- Name: forum_access; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.forum_access (
    uuid uuid NOT NULL,
    related_forum uuid,
    added date,
    flag uuid,
    device uuid
);


ALTER TABLE public.forum_access OWNER TO terminated_games;

--
-- Name: forum_post; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.forum_post (
    uuid uuid NOT NULL,
    related uuid,
    content text,
    related_forum uuid,
    added date,
    device uuid
);


ALTER TABLE public.forum_post OWNER TO terminated_games;

--
-- Name: friend; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.friend (
    uuid uuid NOT NULL,
    related_uuid uuid,
    added date,
    device uuid
);


ALTER TABLE public.friend OWNER TO terminated_games;

--
-- Name: game_account; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.game_account (
    uuid uuid NOT NULL,
    related_uuid uuid,
    name "char",
    related_game_uuid uuid,
    added date
);


ALTER TABLE public.game_account OWNER TO terminated_games;

--
-- Name: game_account_detail; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.game_account_detail (
    uuid uuid NOT NULL,
    related_game_account uuid,
    type uuid,
    value "char",
    added date,
    device uuid
);


ALTER TABLE public.game_account_detail OWNER TO terminated_games;

--
-- Name: game_account_detail_type; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.game_account_detail_type (
    uuid uuid NOT NULL,
    name "char",
    title "char",
    description "char"
);


ALTER TABLE public.game_account_detail_type OWNER TO terminated_games;

--
-- Name: games; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.games (
    uuid uuid NOT NULL,
    title "char",
    name "char",
    added date,
    device uuid
);


ALTER TABLE public.games OWNER TO terminated_games;

--
-- Name: icon; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.icon (
    uuid uuid,
    src "char",
    type uuid,
    added date,
    device uuid
);


ALTER TABLE public.icon OWNER TO terminated_games;

--
-- Name: icon_prefix; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.icon_prefix (
    uuid uuid NOT NULL,
    name "char",
    icon uuid,
    added date
);


ALTER TABLE public.icon_prefix OWNER TO terminated_games;

--
-- Name: profile; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.profile (
    uuid uuid NOT NULL,
    name character varying(45),
    surname character varying(45),
    birth_day integer,
    birth_month integer,
    birth_year integer,
    added timestamp(4) without time zone,
    device uuid
);


ALTER TABLE public.profile OWNER TO terminated_games;

--
-- Name: profile_email; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.profile_email (
    uuid uuid NOT NULL,
    email character varying(45),
    device uuid,
    added timestamp(4) without time zone,
    profile uuid
);


ALTER TABLE public.profile_email OWNER TO terminated_games;

--
-- Name: profile_gametag; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.profile_gametag (
    uuid uuid NOT NULL,
    related uuid,
    added timestamp(4) without time zone,
    device uuid,
    tag character varying(127)
);


ALTER TABLE public.profile_gametag OWNER TO terminated_games;

--
-- Name: profile_password; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.profile_password (
    uuid uuid NOT NULL,
    value character varying(255),
    type uuid,
    profile uuid,
    device uuid,
    added timestamp without time zone
);


ALTER TABLE public.profile_password OWNER TO terminated_games;

--
-- Name: profile_password_type; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.profile_password_type (
    uuid uuid NOT NULL,
    name character varying(128),
    description character varying(256)
);


ALTER TABLE public.profile_password_type OWNER TO terminated_games;

--
-- Name: session; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.session (
    uuid uuid NOT NULL,
    type uuid,
    related uuid,
    added date,
    device uuid,
    public_uuid character varying(88) NOT NULL,
    last_modification timestamp(4) without time zone
);


ALTER TABLE public.session OWNER TO terminated_games;

--
-- Name: session_type; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.session_type (
    uuid uuid NOT NULL,
    description character varying(255),
    name character varying(128),
    title character varying(128)
);


ALTER TABLE public.session_type OWNER TO terminated_games;

--
-- Name: support; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.support (
    uuid uuid NOT NULL,
    category uuid,
    locale uuid,
    title "char",
    description "char",
    icon uuid,
    added uuid,
    device uuid
);


ALTER TABLE public.support OWNER TO terminated_games;

--
-- Name: support_access; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.support_access (
    uuid uuid NOT NULL,
    flag uuid,
    related_support uuid,
    added uuid,
    device uuid
);


ALTER TABLE public.support_access OWNER TO terminated_games;

--
-- Name: support_category; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.support_category (
    uuid uuid,
    name "char",
    title "char",
    description "char",
    icon uuid,
    added date,
    device uuid
);


ALTER TABLE public.support_category OWNER TO terminated_games;

--
-- Name: transaction; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.transaction (
    uuid uuid NOT NULL,
    related uuid,
    related_item uuid,
    related_balance uuid,
    added date,
    device uuid
);


ALTER TABLE public.transaction OWNER TO terminated_games;

--
-- Name: transaction_detail; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.transaction_detail (
    related_transaction uuid,
    type uuid,
    value "char",
    added date,
    device uuid
);


ALTER TABLE public.transaction_detail OWNER TO terminated_games;

--
-- Name: transaction_detail_type; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.transaction_detail_type (
    uuid uuid NOT NULL,
    name "char",
    title "char",
    description "char"
);


ALTER TABLE public.transaction_detail_type OWNER TO terminated_games;

--
-- Name: transaction_state; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.transaction_state (
    related_transaction uuid,
    type uuid,
    added date,
    device uuid
);


ALTER TABLE public.transaction_state OWNER TO terminated_games;

--
-- Name: transaction_state_type; Type: TABLE; Schema: public; Owner: terminated_games
--

CREATE TABLE public.transaction_state_type (
    uuid uuid NOT NULL,
    name "char",
    title "char",
    description "char"
);


ALTER TABLE public.transaction_state_type OWNER TO terminated_games;

--
-- Name: article_category article_category_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.article_category
    ADD CONSTRAINT article_category_index PRIMARY KEY (uuid);


--
-- Name: article_content article_content_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.article_content
    ADD CONSTRAINT article_content_index PRIMARY KEY (uuid);


--
-- Name: article_meta article_meta_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.article_meta
    ADD CONSTRAINT article_meta_index PRIMARY KEY (uuid);


--
-- Name: company_legal company_legal_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.company_legal
    ADD CONSTRAINT company_legal_index PRIMARY KEY (uuid);


--
-- Name: company_legal_region company_legal_region_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.company_legal_region
    ADD CONSTRAINT company_legal_region_index PRIMARY KEY (uuid);


--
-- Name: company_legal_switch company_legal_switch_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.company_legal_switch
    ADD CONSTRAINT company_legal_switch_index PRIMARY KEY (uuid);


--
-- Name: company_legal_type company_legal_type_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.company_legal_type
    ADD CONSTRAINT company_legal_type_index PRIMARY KEY (uuid);


--
-- Name: currency_type currency_type_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.currency_type
    ADD CONSTRAINT currency_type_index PRIMARY KEY (uuid);


--
-- Name: device device_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.device
    ADD CONSTRAINT device_index PRIMARY KEY (uuid);


--
-- Name: flag flag_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.flag
    ADD CONSTRAINT flag_index PRIMARY KEY (uuid);


--
-- Name: flag_type flag_type_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.flag_type
    ADD CONSTRAINT flag_type_index PRIMARY KEY (uuid);


--
-- Name: forum_access forum_access_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.forum_access
    ADD CONSTRAINT forum_access_index PRIMARY KEY (uuid);


--
-- Name: forum forum_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.forum
    ADD CONSTRAINT forum_index PRIMARY KEY (uuid);


--
-- Name: forum_post forum_post_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.forum_post
    ADD CONSTRAINT forum_post_index PRIMARY KEY (uuid);


--
-- Name: friend friend_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.friend
    ADD CONSTRAINT friend_index PRIMARY KEY (uuid);


--
-- Name: game_account_detail game_account_detail_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.game_account_detail
    ADD CONSTRAINT game_account_detail_index PRIMARY KEY (uuid);


--
-- Name: game_account_detail_type game_account_detail_type_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.game_account_detail_type
    ADD CONSTRAINT game_account_detail_type_index PRIMARY KEY (uuid);


--
-- Name: game_account game_account_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.game_account
    ADD CONSTRAINT game_account_index PRIMARY KEY (uuid);


--
-- Name: games games_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_index PRIMARY KEY (uuid);


--
-- Name: icon_prefix icon_prefix_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.icon_prefix
    ADD CONSTRAINT icon_prefix_index PRIMARY KEY (uuid);


--
-- Name: profile_password password_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.profile_password
    ADD CONSTRAINT password_index PRIMARY KEY (uuid);


--
-- Name: profile_password password_unique; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.profile_password
    ADD CONSTRAINT password_unique UNIQUE (uuid);


--
-- Name: profile_email profile_email_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.profile_email
    ADD CONSTRAINT profile_email_index PRIMARY KEY (uuid);


--
-- Name: profile_gametag profile_gametag_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.profile_gametag
    ADD CONSTRAINT profile_gametag_index PRIMARY KEY (uuid);


--
-- Name: profile_password_type profile_password_type_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.profile_password_type
    ADD CONSTRAINT profile_password_type_index PRIMARY KEY (uuid);


--
-- Name: session session_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_index PRIMARY KEY (uuid);


--
-- Name: session_type session_type_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.session_type
    ADD CONSTRAINT session_type_index PRIMARY KEY (uuid);


--
-- Name: support_access support_access_uuid; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.support_access
    ADD CONSTRAINT support_access_uuid PRIMARY KEY (uuid);


--
-- Name: support support_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.support
    ADD CONSTRAINT support_index PRIMARY KEY (uuid);


--
-- Name: transaction_detail_type transaction_detail_type_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.transaction_detail_type
    ADD CONSTRAINT transaction_detail_type_index PRIMARY KEY (uuid);


--
-- Name: transaction transaction_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_index PRIMARY KEY (uuid);


--
-- Name: transaction_state_type transaction_state_type_index; Type: CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.transaction_state_type
    ADD CONSTRAINT transaction_state_type_index PRIMARY KEY (uuid);


--
-- Name: public_uuid_index; Type: INDEX; Schema: public; Owner: terminated_games
--

CREATE UNIQUE INDEX public_uuid_index ON public.session USING btree (public_uuid varchar_ops);


--
-- Name: profile_password password_type; Type: FK CONSTRAINT; Schema: public; Owner: terminated_games
--

ALTER TABLE ONLY public.profile_password
    ADD CONSTRAINT password_type FOREIGN KEY (type) REFERENCES public.profile_password_type(uuid);


--
-- PostgreSQL database dump complete
--

