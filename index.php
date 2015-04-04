<html lang="en-us" data-ng-app="colorhelper">

    <head>

        <link href="http://fonts.googleapis.com/css?family=Open+Sans:700,600,400" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="/resource/style/normalize.css"/>
        <link rel="stylesheet" href="/resource/style/main.css"/>

        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="application-name" content="colorhelper">
-
    </head>

    <body data-ng-controller="Controller">

        <!-- Content wrap -->
        <div role="main" id="main-wrapper" class="inner">

            <!-- Header -->
            <header id="main-header">

                <img id="loading" src="resource/graphic/loading.gif" alt="" data-ng-show="status.active" />

                <!-- Track by $index to avoid duplicate key error https://docs.angularjs.org/error/ngRepeat/dupes -->
                <div data-ng-repeat="color in palette.colors track by $index"
                     data-ng-style="
                     {
                        'background-color': color,
                        'width': headerColumnWidth
                     }"
                     class="color">
                </div>

            </header>

            <!-- Main content -->
            <div id="palette-content">

                <h1 id="palette-heading">{{ palette.title }}</h1>
                <!-- TODO: add refresh button -->

            </div>

            <!-- Footer -->
            <div id="footer">

                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>

            </div>

        </div>

        <!-- Navigation -->
        <div id="nav" data-ng-style="{ 'border-bottom-color': detailsColor }">

            <div class="inner">

                <h1 id="page-heading"><a data-ng-click="update('random')" href="" data-ng-style="{ 'color': detailsColor }">

                    {{ pageName }}

                </a></h1>

                <ul>

                    <li data-ng-repeat="item in menu"><a data-ng-href="{{ item.href }}">{{ item.label }}</a></li>

                </ul>

            </div>

        </div>

        <!-- Status bar -->
        <div id="status-bar" data-ng-show="status.active" data-ng-style="{ 'background': status.background }">

            <div class="inner">

                <span class="status-title">{{ status.title }}</span> {{ status.message }}
                <a class="close" href="close"><img id="close-icon" src="resource/graphic/close-status.png" alt=""/></a>

            </div>

        </div>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
        <script src="resource/javascript/l10n.js"></script>
        <script src="resource/javascript/localizations.js"></script>
        <script src="resource/javascript/main.js"></script>
        <script src="resource/javascript/app.js"></script>

    </body>

</html>