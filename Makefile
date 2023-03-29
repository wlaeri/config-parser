.PHONY: publish test

publish:
	yarn npm publish --access public

test:
	yarn test
