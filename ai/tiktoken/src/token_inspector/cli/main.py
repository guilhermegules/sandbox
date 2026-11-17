import click

from token_inspector.cli.benchmark_command import benchmark_command
from token_inspector.cli.budget_command import budget_command
from token_inspector.cli.compare_command import compare_command
from token_inspector.cli.inspect_command import inspect_command
from token_inspector.cli.proxy_command import proxy_command


@click.group()
@click.version_option(package_name="token-inspector")
def cli() -> None:
    """Token Inspector: LLM Developer CLI & Pre-flight Observability Suite."""
    pass


cli.add_command(inspect_command)
cli.add_command(benchmark_command)
cli.add_command(budget_command)
cli.add_command(compare_command)
cli.add_command(proxy_command)


if __name__ == "__main__":
    cli()
