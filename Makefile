start: prepare-start js-translations js-routing attach-proxy-domain https-server-start webpack-dev-server

stop:
	symfony server:stop

prepare-start:
	@composer install
	@npm install
	php bin/console assets:install --symlink public
	php bin/console doctrine:migrations:migrate -n

attach-proxy-domain:
	symfony proxy:start
	@symfony server:ca:install
	symfony proxy:domain:attach blank-symfony-project

https-server-start:
	symfony server:start -d

webpack-dev-server:
	npm run dev-server

js-translations:
	php bin/console bazinga:js-translation:dump --format=json assets/

js-routing:
	php bin/console fos:js-routing:dump --format=json --target=assets/routes.json


