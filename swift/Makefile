PROJECT_NAME=TheInvisibleGallery
SCHEME_IOS=TheInvisibleGallery
SCHEME_MAC=TheInvisibleGalleryMac
PROJECT_FILE=$(PROJECT_NAME).xcodeproj

.PHONY: generate open build build-ios clean

generate:
	bash scripts/generate_xcodeproj.sh

open: generate
	open $(PROJECT_FILE)

build: generate
	xcodebuild -project $(PROJECT_FILE) -scheme $(SCHEME_MAC) -destination 'generic/platform=macOS' CODE_SIGNING_ALLOWED=NO build

build-ios: generate
	xcodebuild -project $(PROJECT_FILE) -scheme $(SCHEME_IOS) -destination 'generic/platform=iOS' CODE_SIGNING_ALLOWED=NO build

clean:
	rm -rf $(PROJECT_FILE)
