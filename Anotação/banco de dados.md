### cria o banco dados e mostra

CREATE DATABASE EMPRESA;

USE EMPRESA;


CREATE TABLE FUNCIONARIO (

fun_cod  integer AUTO_INCREMENT NOT NULL,

fun_nome varchar(50) NOT NULL,

fun_cargo varchar(30) NOT NULL,

fun_salario float ,

fun_cpf bigint(30) NOT NULL,

fun_ddn date,

PRIMARY KEY(fun_cod, fun_nome));



INSERT INTO FUNCIONARIO VALUES (1 , "José Tadeu Clemer" , "Ferramenteiro" , 1200.50 , 17786796843, 19761212);

INSERT INTO FUNCIONARIO VALUES (2 , "Marcos Fernandes Riso" , "Soldador" , 7200.40 , 23486796843,19600803);

INSERT INTO FUNCIONARIO VALUES (3, "Fabio Nascimento" , "Soldador Jr" , 7200.40 , 17986767543,19660908);

INSERT INTO FUNCIONARIO VALUES (4 , "Maciel dos Santos" , "Soldador Pleno" , 12300.40 , 22286796843,19600803);

INSERT INTO FUNCIONARIO VALUES (5 , "Junior Macieiras" , "Ferramenteiro" , 2350.30 , 33386896842,20000522);

INSERT INTO FUNCIONARIO VALUES (6 , "Renata Travassos Lima" , "Secretaria" , 2500 , 22233396854,20050512);

INSERT INTO FUNCIONARIO VALUES (7 , "Marcia Sales Santos" , "Contadora" , 5678.34 , 67886797773,20130221);

INSERT INTO FUNCIONARIO VALUES (8 , "José Maria Trindade" , "Soldador" , 5200.77 , 66686734243,19771225);

INSERT INTO FUNCIONARIO VALUES (9 , "Maria Lúcia Ribeiro" , "Recepcionista" , 2379.45 , 99933396854,20100803);

INSERT INTO FUNCIONARIO VALUES (10 , "Inocêncio Seràfico" , "Soldador" , 4400.22 , 67754321890,19870702);

INSERT INTO FUNCIONARIO VALUES (11 , "Marcos Fernandes Riso" , "Soldador Pleno II" , 8934.98 , 99988896844,19751031);

INSERT INTO FUNCIONARIO VALUES (12 , "Risomar Guimarães" , "Soldador" , 3600.44 , 36528765423,19901203);

INSERT INTO FUNCIONARIO VALUES (13 , "Luis Carlos Saldanha" , "Conferente" , 2456.88 , 96345668433,20151125);


SELECT * FROM FUNCIONARIO;


BASEADO EM FUNÇÕES EXTRAIA DA BASE AS SEGUINTES INFORMAÇÕES

ESTUDO DE CASO 

UMA METALURGICA ESTÁ PASSANDO POR UMA RESSTRUTURAÇÃO DE CARGOS E SALÁRIOS , A EQUIPE DE GESTÃO DESEJA BASEADO NOS DADOS 

ARMAZENADOS DESEJA TER AS SEGUINTES INFORMAÇÕES :

1 - QUANTOS FUNCIONÁRIOS TEM A EMPRESA ?
R: `SELECT COUNT(*) FROM FUNCIONARIO; `

2 - QUAL O MAIOR SALARIO DA EMPRESA ?
R: `SELECT MAX(fun_salario) FROM FUNCIONARIO;`

3 - QUAL O MENOR SALARIO DA EMPRESA ?
R: `SELECT MIN(fun_salario) FROM FUNCIONARIO; `

4 - QUAL É A MÉDIA DE SALÁRIOS DA EMPRESA ?
R: ` SELECT AVG(fun_salario) FROM FUNCIONARIO; `

5 - QUAL O TOTAL GASTO EM SALÁRIOS ?
R: `SELECT SUM(fun_salario) FROM FUNCIONARIO; `

6 - QUANTOS SOLDADORES TEM A EMPRESA ?
R: `SELECT COUNT(*) FROM FUNCIONARIO where fun_cargo LIKE 'soldador%'; `

7 - QUAL O FUNCIONÁRIO MAIS VELHO DA EMPRESA ? (AQUELES NASCIDOS DE 1975 PARA BAIXO IRÃO SE APOSENTAR)
R: `SELECT COUNT(*) FROM FUNCIONARIO; `

QUAL O NOME DOS FUNCIONÁRIOS IRÃO SE APOSENTAR ?
R: `SELECT COUNT(*) FROM FUNCIONARIO; `
