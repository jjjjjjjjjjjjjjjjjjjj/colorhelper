<html lang="en-us" data-ng-app="colorhelper">

    <head>

        <link href="http://fonts.googleapis.com/css?family=Open+Sans:700,600,400" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="/resource/style/normalize.css"/>
        <link rel="stylesheet" href="/resource/style/main.css"/>

        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="application-name" content="colorhelper">

    </head>

    <body data-ng-controller="MainController">

        <!-- Content wrap -->
        <div role="main" id="main-wrapper" class="inner">

            <!-- Header -->
            <header id="main-header">

                <img id="loading" src="resource/graphic/loading.gif" alt="" data-ng-show="status.active" />

                <svg id="header-svg" data-ng-controller="SVGController" viewBox="0 0 100 100" preserveAspectRatio="none">

                    <!-- Track by $index to avoid duplicate key error https://docs.angularjs.org/error/ngRepeat/dupes -->
                    <path d="" data-ng-repeat="color in palette.colors track by $index"
                          data-ng-attr-fill="{{ '#' + color }}"
                          class="color"
                          data-ng-attr-d="{{ getPath( $index, palette.colors.length ) }}">
                    </path>

                </svg>

            </header>

            <!-- Main content -->
            <div id="palette-content">

                <h1 id="palette-heading">{{ palette.title }}</h1>

                <ul id="palette-meta">
                    <li class="meta-item" data-ng-repeat="item in palette.meta track by $index">{{ item }}</li>
                </ul>


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
        <div id="nav" data-ng-style="{ 'border-bottom-color': colorscheme.details }">

            <div class="inner">

                <h1 id="page-heading"><a data-ng-click="update('random')" href="" data-ng-style="{ 'color': colorscheme.details }">

                    {{ app.name }}

                </a></h1>

                <!-- Menu
                <ul data-ng-controller="NavigationController">

                    <li data-ng-repeat="item in menu">
                        <a data-ng-href="{{ item.href }}">
                            {{ item.label }}
                        </a>

                        <!-- Submenu
                        <ul data-ng-show="item.subMenu">
                            <li data-ng-repeat="child in item.subMenu">
                                <a data-ng-href="{{ child.href }}">
                                    {{ child.label }}
                                </a>
                            </li>
                        </ul>
                    </li>

                </ul> -->

            </div>

        </div>

        <!-- Status bar -->
        <div id="status-bar" data-ng-show="status.active" data-ng-style="{ 'background': status.background }">

            <div class="inner">

                <span class="status-title">{{ status.title }}</span> {{ status.message }}
                <a class="close nolink" href="close"><img id="close-icon" src="resource/graphic/close-status.png" alt=""/></a>

            </div>

        </div>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
        <script src="resource/javascript/l10n.js"></script>
        <script src="resource/javascript/localizations.js"></script>
        <script src="resource/javascript/app.js"></script>
        <script src="resource/javascript/controller/main.js"></script>
        <script src="resource/javascript/controller/navigation.js"></script>
        <script src="resource/javascript/controller/svg.js"></script>

    </body>

</html>