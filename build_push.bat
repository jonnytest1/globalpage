npm run-script build;

set MyPath=%~dp0dist\globalwebpage\*

call "C:\Program Files (x86)\WinSCP\WinSCP.com" /command ^
	"open -passive=on -timeout=60 ftp://u94127760:1234567@jonathanheindl.de:21" ^
	"put ""%MyPath%""" ^
	"exit"
	
pause