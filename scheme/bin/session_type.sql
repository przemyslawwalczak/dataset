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

TRUNCATE public.session_type;

--
-- Data for Name: session_type; Type: TABLE DATA; Schema: public; Owner: terminated_games
--

INSERT INTO public.session_type VALUES ('e2e87ffc-1843-4cf7-b74f-9987f5d41b7c', 'Network session type', 'NETWORK', 'Network Session');


--
-- PostgreSQL database dump complete
--

