HOMEDIR = $(shell pwd)
SMUSER = bot
PRIVUSER = root
SERVER = smidgeo
SSHCMD = ssh $(SMUSER)@$(SERVER)
PRIVSSHCMD = ssh $(PRIVUSER)@$(SERVER)
PROJECTNAME = github-token-exchanger
APPDIR = /opt/$(PROJECTNAME)

pushall: update-remote
	git push origin master

sync:
	rsync -a $(HOMEDIR) $(SMUSER)@$(SERVER):/opt/ --exclude node_modules/ --exclude data/
	$(SSHCMD) "cd /opt/$(PROJECTNAME) && npm install"

restart-remote:
	$(PRIVSSHCMD) "service $(PROJECTNAME) restart"

set-permissions:
	$(PRIVSSHCMD) "chmod +x $(APPDIR)/start-$(PROJECTNAME)-server.js"

update-remote: sync set-permissions restart-remote

install-service:
	$(PRIVSSHCMD) "cp $(APPDIR)/$(PROJECTNAME).service /etc/systemd/system && \
	systemctl daemon-reload"

set-up-directories:
	$(PRIVSSHCMD) "mkdir -p $(APPDIR) && sudo chown $(SMUSER):$(SMUSER) $(APPDIR)"

initial-setup:
	make set-up-directories sync set-permissions install-service

check-status:
	$(SSHCMD) "systemctl status $(PROJECTNAME)"

check-log:
	$(SSHCMD) "journalctl -r -u $(PROJECTNAME)"

get-code:
	open https://github.com/login/oauth/authorize?client_id=$(CLIENTID)&scope=public_repo

restart:
	$(PRIVSSHCMD) "service $(PROJECTNAME) restart"

stop:
	$(PRIVSSHCMD) "service $(PROJECTNAME) stop"
