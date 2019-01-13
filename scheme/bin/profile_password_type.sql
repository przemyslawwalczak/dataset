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

--
-- Table truncation
--

TRUNCATE public.profile_password_type;

--
-- Data for Name: profile_password_type; Type: TABLE DATA; Schema: public; Owner: terminated_games
--

INSERT INTO public.profile_password_type VALUES ('046c23f0-0a1e-40b8-94bf-ac5d6c57f8e0', 'NETWORK', 'A password type used in Network');


--
-- PostgreSQL database dump complete
--

