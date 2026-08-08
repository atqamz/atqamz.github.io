{
  description = "Development shell for atqamz_pub";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { nixpkgs, ... }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
      ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      devShells = forAllSystems (
        system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              elmPackages.elm
              elmPackages.elm-format
              git
              gnumake
              nodejs
              pulumi
              python3
              texliveFull
            ];
          };
        }
      );
    };
}
