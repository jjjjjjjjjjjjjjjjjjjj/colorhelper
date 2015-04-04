<html lang="en-us" data-ng-app="colorhelper">

    <head>

        <link rel="stylesheet" href="/resource/style/reset.css"/>
        <link rel="stylesheet" href="/resource/style/main.css"/>

        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="application-name" content="colorhelper">

    </head>

    <body data-ng-controller="Controller">

        <!-- Header -->
        <header id="main-header">

            <!-- Track by $index to avoid duplicate key error https://docs.angularjs.org/error/ngRepeat/dupes -->
            <div data-ng-repeat="color in palette.colors track by $index"
                 data-ng-style="{
                                    'background-color': color,
                                    'width': headerColumnWidth
                                }"
                 class="color">

            </div>

        </header>

        <!-- Content wrap -->
        <div role="main" class="main-wrapper">

            <!-- Main content -->
            <div id="main-content">

                <h1 class="main-heading"></h1>

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
        <div id="nav">


        </div>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
        <script src="resource/javascript/app.js"></script>

    </body>

</html>