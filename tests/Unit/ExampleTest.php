<?php

namespace tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_that_true_is_true()
    {
        $this->assertTrue(true);
    }
}
