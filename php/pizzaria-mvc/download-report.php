<?php

require(__DIR__ . '/controller/ReportController.php');

$report = new ReportController();

$report->templateHandler();
